import React from 'react'

interface Props {
    text: string;
}

const Button: React.FC<Props> = (props) => {
    return (

        <input type="submit" className='bg-slate-100 p-3 rounded-md hover:bg-slate-300 ' value={props.text} />

    )
}

export default Button