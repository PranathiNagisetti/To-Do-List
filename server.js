const express=require('express');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"frontend")));

let todos=[];

app.get('/',(req,res)=>{
    console.log("Default Route");
    res.sendFile(path.join(__dirname,"frontend","todolist.html"));
})

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/add-item',(req,res)=>{
    const {text}=req.body;
    const newTodo={
        id: Date.now(),  
        text
    };
    todos.push(newTodo);
    res.json({todos});
});


app.delete('/delete-item/:id',(req,res)=>{
    const{id}=req.params;
    todos=todos.filter(todo=>todo.id!=id);
    res.json({ message: 'Sucessfully Deleted!' });

})

app.put('/edit-item/:id',(req,res)=>{
    const {id}=req.params;
    const {text}=req.body;
    todos=todos.map(todo => todo.id==id?{...todo,text}:todo);
    res.json({ message: 'Updated Sucessfully!' });
})

app.listen(3000,()=>{
    console.log("Server started running on port!")
})