import React, { useState } from 'react'
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

function StateBox(props) {

    const [Value, setValue] = useState(0)

    const renderRadioBox = () => (
        props.list && props.list.map(value => (
            <Radio key={value._id} value={value._id}>{value.name}</Radio>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
        //console.log((event.target.value))
    }
     
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="상태(?)" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default StateBox
