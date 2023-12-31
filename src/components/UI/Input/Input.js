import React from 'react'; 
import classes from './Input.module.css';

const input = (props) =>{
    let inputElement=null;
    const inputClasses =[classes.InputElement];
    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch (props.elementtype){
        case('input'):
            inputElement= <input 
            className={inputClasses.join(' ')}
            {...props.elementconfig} 
            value={props.vlaue}
            onChange={props.changed} />
            break;
        case('textarea'):
            inputElement= <textarea 
            className={inputClasses.join(' ')}
            {...props.elementconfig} 
            value={props.vlaue}
            onChange={props.changed} />
            break;
        case('select'):
            inputElement= (
                <select 
                className={inputClasses.join(' ')} 
                value={props.vlaue}
                onChange={props.changed}> 
                    {props.elementconfig.options.map(option=>(
                        <option value={option.value} key={option.value}>
                            {option.displayVale}
                        </option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement= <input 
            className={inputClasses.join(' ')}
            {...props.elementconfig} 
            value={props.vlaue} 
            onChange={props.changed} />
    }
    return (
        <div  className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    ); 
}
export default input;