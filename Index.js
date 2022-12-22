const Joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());

const courses=[
    {id:1,name:'React Js'},
    {id:2,name:'Node JS'},
    {id:3,name:'Mongo DB'},
    {id:4,name:'ASP.net'}
];

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/api/course',(req,res)=>{
    res.send(courses)
})

//app.get('/api/course/:years/:month',(req,res)=>{
    //res.send(req.params)
    // res.send(req.query)
//})

app.get('/api/course/:id',(req,res)=>{
  const course = courses.find(c=>c.id===parseInt(req.params.id))
  if(!course){
    res.status(404).send('the course with the given ID Was Not Found')    
    return
  }
  else
  {
    res.send(course);
  }
});

app.post('/api/course',(req,res)=>{

    const schema={
        name:Joi.string().min(3).required()
    };

    // const result=Joi.validate(req.body,schema);
    // console.log(result)

    if(req.body.name.length<3)
    {
        res.status(400).send('Name is Required')
        return
    }
    else{
        const course={
            id:courses.length + 1,
            name:req.body.name
        };
        courses.push(course);
        res.send(course);
    }
});

app.put('/api/course/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){
        res.status(404).send('the course with the given ID Was Not Found')    
        return
    };
    const schema={
        name:Joi.string().min(3).required()
    };
    if(req.body.name.length<3)
    {
        res.status(400).send('Name is Required')
        return
    }
    course.name=req.body.name;
    res.send(course);
})

app.delete('/api/course/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id))
    if(!course){
        res.status(404).send('the course with the given ID Was Not Found')    
        return
    };

    const Index = courses.indexOf(course);
    courses.splice(Index,1);

    res.send(course);
})

const port=process.env.PORT || 3000


app.listen(port,()=>console.log('Listening on port no 3000'));