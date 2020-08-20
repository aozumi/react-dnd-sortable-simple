# react-dndによる並べ替えの実装例

オリジナル:
https://github.com/react-dnd/react-dnd/tree/main/packages/documentation/examples-hooks/src/04-sortable/simple

変更点:
 - ドラッグのキャンセル時にドラッグ開始前の状態を復元
   - `useDrag()`の第1引数に`begin`と`end`の手続きを設定
 - 左端のハンドルを持ってドラッグ
   - `useDrag()`の第2戻り値`drag`をハンドルのrefに設定
   - `useDrag()`の第3戻り値`preview`をプレビュー(ドラッグ中移動表示される内容)のrefに設定
