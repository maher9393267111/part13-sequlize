require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

// const sequelize = new Sequelize('mysql-93288-0.cloudclusters.net', {
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// })


const option = {
    host: "mysql-93288-0.cloudclusters.net",
    //"sql11.freesqldatabase.com",
    dialect: "mysql",
    port: 10016,
  //   pool: {
  //     max: 30,
  //     min: 0,
  //   },
  };
  
  const databaseName = "myFIRST";
  const databaseUsername = "admin";
  const databasePassword = "xC8D2L3M";
  
  const sequelize = new Sequelize(
    databaseName,
    databaseUsername,
    databasePassword,
    option
  );
  try {
   // await 
    sequelize.authenticate();
    console.log("connection successful");
  } catch (error) {
    console.log(error , 'ERROR TO CONNECT TO DATABASE');
  }





class Blogs extends Model {}

Blogs.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descrep: {
        type: DataTypes.STRING,
        allowNull: true
    },
    likes: {
        type: DataTypes.INTEGER,
        default: 0
    }
}, {
    sequelize
})

Blogs.sync({alter: true })  // update columns in sameTime

app.use(express.json())

app.get('/api/blogs', async(req, res) => {
    try {
        const blogs = await Blogs.findAll()
        console.log(JSON.stringify(blogs, null, 2))
        res.status(200).json(blogs)
    } catch(err) {
        console.log(err)
        res.status(400).json({ msg: err })
    }
})

app.post('/api/blogs', async(req, res) => {
    try {
        const blog = req.body
        const createBlogs = await Blogs.create(blog)
        return res.status(201).json(createBlogs)
    } catch(err) {
        console.log(err)
        return res.status(400).json({ msg: err })
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    const blogId = req.params.id
    try {
        const blog = await Blogs.findByPk(blogId)
        await blog.destroy()
        res.status(200).json(blog)
    } catch(err) {
        console.log(err)
        return res.status(500).json({ msg: err })
    }
})


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Listening in PORT: ${PORT}!`)
})