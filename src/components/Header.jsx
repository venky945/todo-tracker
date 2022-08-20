import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom';
const Header = ({title, onAdd, showAddTodo}) => {
	const location = useLocation();
	return (
		<header className='header'>
			<h1>
				ToDo Tracker: {title}
			</h1>
			{location.pathname === '/' && <Button color={!showAddTodo? 'green': 'red'} text={!showAddTodo? 'Add': 'Close'} onClick={onAdd}/>}
		</header>
	)
}

Header.defaultProps = {
	title: 'weekly'
}

Header.propTypes = {
	title: PropTypes.string.isRequired,
	onAdd: PropTypes.func.isRequired,
	showAddTodo: PropTypes.bool.isRequired
}

// const headingStyle = {color: 'red'};
export default Header;