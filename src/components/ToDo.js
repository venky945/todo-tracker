import PropTypes from 'prop-types';
import {FaTimes} from 'react-icons/fa'


const ToDo = ({todo, onDelete, onToggleRem}) => {
	return (
		<div className={`todo ${todo.reminder ? 'reminder' : ''}`} onDoubleClick={()=> onToggleRem(todo.id)}>
			<h3>{todo.text} <FaTimes style={{color:'red', cursor: 'pointer'}} onClick={() => onDelete(todo.id)}/></h3>
			<h3>{todo.time}</h3>
		</div>
	)
}

ToDo.defaultProps = {
	todo: {
		id: 1, text: 'sleep'
	}
}

ToDo.propTypes = {
	todo: PropTypes.shape({
		id: PropTypes.number,
		text: PropTypes.string,
		time: PropTypes.string,
		reminder: PropTypes.bool
	})
}

export default ToDo;