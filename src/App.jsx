import './App.css'
import {useState} from 'react'
const div = {
  display: 'flex',
  flexDirection:'column',
  alignItem:'center',
  width:'100%',
  height: '100vh',
}
const li={
  display: 'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  width:'100%',
  alignItem:'center',
  textAlign:'center',
  background: '#e9eff2',
  padding:'10px 20px',
  borderRadius:'30px',
  wordWrap:'break-word',
  wordBreak:'break-all',
}
const ul = {
  display: 'flex',
  flexDirection:'column',
  alignItem:'center',
  width:'80%',
  height:'75%',
  margin:'30px 0 0 45px',
  background:'#527a89',
  padding:'30px 20px',
  borderRadius:'30px',
  gap:'15px',
  overflowX:'hidden',
  overflowY:'scroll',
}
const foot = {
  background:'#6390a1',
  textAlign:'center',
  padding:'10px 0',
  color:'#fff', 
  width:'100%'
}
const all ={
    display: 'flex',
  flexDirection:'column',
  width:'100%',
  height:'80%',
  justifyContent:'space-evenly'
}
const but ={
  display:'flex',
  flexDirection:'row',
  justifyContent:'center',
  alignItem:'center',
  width:'100%',
  marginTop:'7px',
  gap:'20px'
}
const butt={
  border:'none',
  color:'white',
  padding:'10px',
  background:'#527a89',
  borderRadius:'10px',
}
const select ={
 background: '#fff', 
  border:'none',
  outline:'none',
  
}
export default function App() {
  const [arr,setArr] = useState([])
  function pushArr(val){
    setArr(i => [...i,val])
  }
function deleteItem(id) {
   setArr(i => i.filter(x => x.id !== id))
}
  function update(id) {
    setArr(i => i.map(x => x.id === id? {...x,done:!x.done}:x))
  }
  function clear() {
    setArr([]) 
  }
  function setVal(vals){ 
const b = arr.sort((a,b) => {return b[vals] > a[vals]? 1:b[vals] < a[vals] ? -1: 0})
setArr([...b])
  }
  return (
    <div style={div}>
    <h1 >TODO LIST 📙</h1>
      <Input pushs={pushArr}/>
      <List clear={clear} arra={arr} del={deleteItem} setArrVal={setVal} update={update}/>
      <Footer a={arr}/>
      </div>
  ) 
}
function Input({pushs}){
  const [val,setVal] = useState('')
  function getVal(e){
e.preventDefault()
    if(!val)return
    val.trim()
    const newArr = {val,id:Date.now(),done:false}
    pushs(newArr)
setVal('')
  }
  return <form onSubmit={getVal}>
  <input placeholder="Enter a todo..." type="text" value={val} onChange={(e) => setVal(e.target.value)} />
  </form>
}
function List({arra,del,update,clear,setArrVal}){
  return  <div style={all}>
    <ul style={ul}>
    {arra.map(x =>  <Render del={del} key={x.id} xy={x} update={update} />)}
        </ul>
    <div style={but} >
      <select style={select} onChange={(e) => setArrVal(e.target.value)}>
        <option value='val'>SORT BY VALUE</option>
        <option value='done'>SORT BY COMPLETE TODO</option>
      </select>
      <button onClick={clear} style={butt}>Clear All</button>
      </div>
    </div>
}
function Render({xy,del,update}){
  return <li onClick={() => update(xy.id)} style={{...li,background:`${xy.done?'#889bcd':'#e9eff2'}`,color:`${xy.done?'#fff':'black'}`}}>
    <div><span>{xy.done?'✔️':''}</span> {xy.val}</div>
<div onClick={()=>del(xy.id)}>❌</div>
  </li>
}
function Footer({a}) {
const l = a.length
  const p = a.filter(x => x.done === true).length 
const perL = Math.floor((p / l) * 100)
  return <p style={foot}>
   <em>{l === 0?'Start todo 🚀🚀🚀':perL === 100?"You have successfully finished your todos... You're free to go🥳":`You have ${l} ${l === 1?'todo':'todos'} on your and you've done ${p} ${perL}%`}</em>
   </p>
}