import React, { useRef } from 'react';
import style from './Card.module.css';
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from 'react-dnd';
import ItemTypes from './ItemTypes';

type CardProps = {
    text: string,
    id: any,
    index: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void,
    startDrag: () => void,
    cancelDrag: () => void,
};

type DragItem = {
    index: number,
    id: string,
    type: string,
}

const Card: React.FC<CardProps> = ({text, id, index, moveCard, startDrag, cancelDrag}) => {
    const ref = useRef<HTMLDivElement>(null);

    // ドラッグ可能にする
    const [{isDragging}, drag, preview] = useDrag({
        item: { type: ItemTypes.CARD, id, index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
        begin: (monitor) => { 
            // ドラッグ開始時のカードの並びを保存する
            startDrag() 
        },
        end: (item, monitor) => {
            if (!monitor.didDrop()) {
                // ドラッグがキャンセルされたのでカードの並びを復元する
                cancelDrag();
            }
        }
    });

    // ドロップ可能にする
    const [{}, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover: (item: DragItem, monitor: DropTargetMonitor) => {
            if (ref.current === null) {
                return;
            }
            if (index === item.index) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset(); // ドラッグ中のマウスの位置
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top; // この要素中のマウスY座標
            const flag = (item.index < index) === (hoverClientY < hoverMiddleY);
            // console.log("hoverMiddleY=" + hoverMiddleY + ", hoverClientY=" + hoverClientY + ", flag=" + flag);
            if ((item.index < index) === (hoverClientY < hoverMiddleY)) {
                return;
            }
            moveCard(item.index, index);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
            item.index = index;
        }
    })

    // ドラッグ中、元の要素は表示を消す(場所はとったまま)
    const opacity = isDragging ? 0 : 1;
    // 複数のrefで同じ要素を指すようにできる
    preview(drop(ref));
    return (
        <div ref={ref} className={style.Card} style={{opacity}}>
            <span ref={drag} className={style.Handle}/>
            {text}
        </div>
    );
}

export default Card;
