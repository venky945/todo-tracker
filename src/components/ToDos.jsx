import ToDo from "./ToDo";
const ToDos = ({todos, onDelete, onToggleRem}) => {
	return (
		<>
			{todos.map((todo)=> (<ToDo key={todo.id} todo={todo} onDelete={onDelete} onToggleRem={onToggleRem}/>) )}
		</>
	)
}

export default ToDos;