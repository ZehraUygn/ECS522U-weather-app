import { h, render, Component } from 'preact';
import style from './style';
import $ from 'jquery';

class Button extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text: props.text, clickpointer: props.pointer};
    }

    render()
    {
        return(
            <div onclick={() => this.state.clickpointer()}>
                <p class={style.button_style}>{this.state.text}</p>
            </div>
        )
    }
}

export default Button;