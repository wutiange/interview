import logo from './logo.svg';
import './App.css';
import Table from './Table/Table';
import { useCallback, useState } from 'react';

function App() {
    const dataSource = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push({
                title: {
                    name: `Quotation for 1PCS Nano ${
                        3 + i
                    }.0 contr0ller compatible`,
                },
                id: 100306660940 + i,
                time: 2000 + i,
            });
        }
        return result;
    };
    const render = (value, index, record) => {
        return <a href={'javascript:;'}>Remove({record.id})</a>;
    };
    return (
        <div className="App">
            <Table dataSource={dataSource()}>
                <Table.Column
                    title={'id'}
                    htmlTitle={'Unique Id'}
                    dataIndex={'id'}
                />
                <Table.Column title={'Title'} dataIndex={'title.name'} />
                <Table.Column title={'Time'} dataIndex={'time'} />
                <Table.Column cell={render} />
            </Table>
        </div>
    );
}

export default App;
