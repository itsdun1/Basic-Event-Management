const express = require('express')
const moment = require('moment');

const { sequelize, user, event, role } = require('./models')

const { Op } = require('sequelize');


const app = express()
app.use(express.json())

app.post('/events', async (req, res) => {
  const { name, startTime, duration, manager } = req.body

  try {
    const newEvent = await event.create({
      event_name: name, event_start_time: moment(startTime), event_end_time: moment(startTime).add(duration, 'm'),
      userId: manager, is_active: 1, event_duration: duration
    })

    return res.json(newEvent)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.delete('/events/:id', async (req, res) => {
  console.log(req.params.id);
  try {

    const deleteEvent = await event.update(
      { is_active: 0 },
      { where: { id: req.params.id } }
    )
    return res.json(deleteEvent)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await user.findAll({
      where: {
        is_active: 1
      },
      include: ['role', 'event']
    })

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.get('/fetchevents', async (req, res) => {
  let response = {};
  try {
    const events = await event.findAll({
      where: {
        is_active: 1,
        event_start_time: {
          [Op.gte]: moment()
        }
      },
      include: ['user']
    })
    response.futureEvents = events;
    const upcomingLiveEvents = await event.findAll({
      where: {
        event_start_time: {
          [Op.and]: [
            {
              [Op.gte]: moment()
            },
            {
              [Op.lte]: moment().add(15, 'm')
            }
          ]
        }
      },
      include: ['user']
    })
    response.upcomingLiveEvents = upcomingLiveEvents;
    return res.json(response)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.listen({ port: 3000 }, async () => {
  console.log('Server up on http://localhost:3000')
  await sequelize.authenticate()
  await sequelize.sync({ alter: true })
  console.log('Database Connected!')
})
