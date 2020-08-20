import React, { useState, useCallback } from 'react';
import update from 'immutability-helper';
import Card from './Card';

const Container: React.FC = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Write a cool JS library',
        },
        {
            id: 2,
            text: 'Make it generic enough',
        },
        {
            id: 3,
            text: 'Write README',
        },
        {
            id: 4,
            text: 'Create some examples',
        },
        {
            id: 5,
            text:
                'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
            id: 6,
            text: '???',
        },
        {
            id: 7,
            text: 'PROFIT',
        },
    ]);

    const [origCards, setOrigCards] = useState(cards);

    const saveCards = () => {
        setOrigCards(cards);
    }
    const restoreCards = () => {
        setCards(origCards);
    }

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            console.log("moveCard " + dragIndex + " " + hoverIndex);
            setCards(
                update(cards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, cards[dragIndex]],
                    ],
                })
            )
        },
        [cards]
    );


    return (
        <div>
            {cards.map((x, i) => <Card key={x.id} text={x.text} index={i} id={x.id} moveCard={moveCard} startDrag={saveCards} cancelDrag={restoreCards}/>)}
        </div>
    )
}

export default Container;
