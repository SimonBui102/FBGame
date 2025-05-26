import { useState, type ChangeEvent } from "react";
import type { GameDefinitionDto } from "../models/gameDefinitionDto";
import { NavLink, useNavigate } from "react-router-dom";
import apiConnector from "../api/apiConnector";
import { Button, Form, FormGroup, Segment } from "semantic-ui-react";
import type { GameRuleDto } from "../models/gameRuleDto";

export default function GameForm() {

    const navigate = useNavigate();


    const [gameDefinition, setGameDefinition] = useState<GameDefinitionDto>({
        id: undefined,
        authorName: '',
        gameName: '',
        minNumber: 0,
        maxNumber: 0,
        createDate: undefined,
        rules:[]



    });

    function handleSubmit() {

       apiConnector.createGameDefinition(gameDefinition).then(() => navigate('/'));
        console.log(gameDefinition);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {

        const { name, value } = event.target;
        setGameDefinition((g) => ({...g,[name]: name.includes("Number")? Number(value):value


        }));


    }

    const handleRuleChange = (idx: number, field: keyof GameRuleDto, value: string) => {

        setGameDefinition((g) => { 
        const rules = [...g.rules];
        rules[idx] = {
            ...rules[idx],
            [field]: field == 'divisor' ? Number(value) : value
        };

            return { ...g, rules }
        });


    }

    const addRule = () => {

        setGameDefinition((g) => ({

            ...g,
            rules: [...g.rules, { divisor: 0, word: 'Example' }]


        }));

    }


    const removeRule = (idx: number) => {

        setGameDefinition((g) => ({...g, rules: g.rules.filter((_, index) => index !== idx)}))

    }

    

     
    return (
        <>
            <Segment clearing inverted>
                <Form onSubmit={ handleSubmit} autoComplete='off' className= 'ui inverted form'>
                    <Form.Input label = 'Author Name:' placeholder='Author Name' name='authorName' value={gameDefinition.authorName} onChange={handleChange} />
                    <Form.Input label='Game Name:' placeholder='Game Name' name='gameName' value={gameDefinition.gameName} onChange={handleChange} />
                    <FormGroup widths='equal'>
                        <Form.Input label='Min Number:' placeholder='Min Number' type='number' name='minNumber' value={gameDefinition.minNumber.toString()} onChange={handleChange} />
                        <Form.Input label='Max Number:' placeholder='Max Number' type='number' name='maxNumber' value={gameDefinition.maxNumber.toString()} onChange={handleChange}  />

                    </FormGroup>

                    <h4> Rules</h4>

                    {gameDefinition.rules.map((rule,idx) => (
                       
                            <FormGroup widths='equal' key={idx} style={{ display: 'flex', alignItems: 'flex-end' }} >
                            <Form.Input label='Divisor' placeholder='Divisor' type='number' value={rule.divisor.toString()} onChange={(e) => handleRuleChange(idx, 'divisor', e.target.value)} width={ 6} />
                            <Form.Input label='Word' placeholder='Word' value={rule.word} onChange={(e) => handleRuleChange(idx, 'word', e.target.value)} />
                            <Button type='button'  content="Delete" color='red'  onClick={ () => removeRule(idx)} />
                            </FormGroup>
                       
                    
                    ))}
                    

                    <Button floated='right' positive type='submit' content='Submit' />
                    <Button floated='right' primary type='button' onClick={ addRule} content='+ Add Rule' />
                    <Button floated='left' as={NavLink} to='/'  type='button' content='Cancel' />
                </Form>

            </Segment>

        </>
    );


}