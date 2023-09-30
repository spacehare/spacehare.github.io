interface props {
	obj: any
}

const Copy = (input: any) => {
	navigator.clipboard.writeText(input.text)
}

export default (props: props) => {
	return <button onclick={() => Copy(props.obj[1])}>{props.obj[0]}</button>
}
