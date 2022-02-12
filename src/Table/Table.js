import { useCallback, useEffect, useState } from 'react';
import './style.css';

function getValByAttrArr(obj, attrs) {
    let val = '';
    let copyData = obj;
    for (let i = 0; i < attrs.length; i++) {
        val = copyData[attrs[i]];
        if (!val) return '';
        copyData = val;
    }
    return val;
}

const Table = (props) => {
    const { dataSource, children, style, className } = props;

    const handleChildren = useCallback(() => {
        const newChildren = Array.isArray(children) ? children : [children];
        let renders = [];
        let actualTiles = [];
        let attrs = [];
        let uniqueIdAttr = "";
        newChildren.forEach((children, index) => {
            // 读取孩子的 props 属性
            const { title, htmlTitle, dataIndex, cell } = children?.props || {};
            // 保存每一项的新标题
            actualTiles.push(title || '');
            // 处理 dataIndex ，方便拿取数据中的属性名
            let attr = dataIndex ? dataIndex : '';
            attr = /\w+.\w+/.test(attr) ? attr.split('.') : [attr];
            attrs.push(attr);
            if (!uniqueIdAttr && htmlTitle === "Unique Id") {
                uniqueIdAttr = attr;
            }
            renders[index] = null;
            renders[index] = cell ? cell : renders[index];
        });
        return {
            renders,
            actualTiles,
            attrs,
            uniqueIdAttr
        };
    }, [children]);
    const { renders, actualTiles, attrs, uniqueIdAttr } = handleChildren();
    return (
        <table className={`${className} table-scope`} style={style}>
            <thead className={'thead-scope'}>
                <tr className={'tr-scope'}>
                    {actualTiles.map((title, index) => {
                        return <th className={'th-scope'} key={index}>{title}</th>;
                    })}
                </tr>
            </thead>
            <tbody className={'tbody-scope'}>
                {(dataSource || []).map((data, fatherI) => {
                    return (
                        <tr key={getValByAttrArr(data, uniqueIdAttr)} className={'tr-scope'}>
                            {renders.map((render, index) => {
                                const attrVal = getValByAttrArr(data, attrs[index]);
                                const content = render ? render(attrVal, index, data) : attrVal;
                                return (
                                    <td
                                        className={'td-scope'}
                                        key={index + fatherI}
                                    >
                                        {content}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

Table.Column = () => {
    return null;
};

export default Table;
