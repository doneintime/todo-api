const expect = require('expect');
const request = require('supertest');

const {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [{
    _id: new ObjectID(),
    text: "Some todo 1",
    completed: false,
    completedAt: null
},
{
    _id: new ObjectID(),
    text: "Some todo 2",
    completed: true,
    completedAt: 333
}];

beforeEach((done)=>{
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(()=> done());
})

describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = "from new todo";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }

                Todo.find({text: "from new todo"}).then((todos)=>{
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    })

    it('should not create tdo with invalid body data', (done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=>done(e));
            })
    })
})

describe('POST delete /todos/:id', ()=>{
    it('shold delete todos with particular id', (done)=>{
        let hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(hexId)
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                Todo.findById(hexId).then((todo)=>{
                    expect(todo).toNotExist();
                    done();
                }).catch((e)=> done(e));
            })
    })

    it('should return 404 if todo not found', (done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    })

    it('should return 404 if an object id is not valid', (done)=>{
        var id = 1234;
        request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done);
    })
})

describe('GET /todos', ()=>{
    it('should get all todos', (done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.todos.length).toBe(2)
            })
            .end(done); 
    })
})

describe('GET /todos/:id', () => {
    it('shuold get a todo by id and return a doc', (done)=>{
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[1].text);
            })
            .end(done);
    })

    it('should return 404 if todo not found', (done)=> {
        var id = new ObjectID();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    })

    it('should return 404 for non-object id', (done)=>{
        var id = 1234;
        request(app)
            .get(`/todos/${id}`)
            .expect((res)=>{
                expect(res.status).toBe(404)
            })
            .end(done);
    })
})

describe('PATCH /todos/:id', ()=>{
    it('should update the todo', (done)=>{
        var id = todos[1]._id.toHexString();
        var text = "new text";
        request(app)
            .patch(`/todos/${id}`)
            .send({
                text, 
                completed: true
            })
            .expect((res)=>{
                expect(res.body.todo.text).toBe(text)
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.findById(id).then((todo)=>{
                    expect(todo.text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            });
    })

    it('should clear completedAt when todo is not completed', (done)=>{
        var id = todos[0]._id.toHexString();
        var text = "new text";
        request(app)
            .patch(`/todos/${id}`)
            .expect(200)
            .send({
                text, 
                completed: false
            })
            .expect((res)=>{
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    })
})
