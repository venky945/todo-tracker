import { useState } from "react";

const AddTodo = ({onAddTodo}) => {
	const [text, setText] = useState('');
	const [time, setTime] = useState('');
	const [reminder, setReminder] = useState(false);
	const onSubmit = (e) => {
		e.preventDefault();
		if(!text) {alert('add todo'); return}
		onAddTodo({text, time, reminder});
		setText('');setTime('');setReminder(false);
	}
	return (
		<form className='add-form' onSubmit={onSubmit}>
			<div className='form-control'>
				<label>ToDo</label>
				<input type='text' value={text} placeholder='Add Todo' onChange={(e)=> setText(e.target.value)}/>
			</div>
			<div className='form-control'>
				<label>Time</label>
				<input type='text' value={time} placeholder='Add Time' onChange={(e)=> setTime(e.target.value)} />
			</div>
			<div className='form-control form-control-check'>
				<label>Set Reminder</label>
				<input type='checkbox' checked={reminder} value={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}/>
			</div>
			<input className="btn btn-block" type='submit' value='Save Todo' />
		</form>
	)
}

export default AddTodo