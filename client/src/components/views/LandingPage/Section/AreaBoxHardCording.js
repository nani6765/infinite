import React from 'react'
import { Collapse, Checkbox } from 'antd';
import { areaContinents } from './Datas'

const { Panel } = Collapse;

function AreaBox() {
    return (
        
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="지역" key="1">
                    <Checkbox>{areaContinents[0].name}</Checkbox>
                    <Checkbox>{areaContinents[1].name}</Checkbox>
                    <Checkbox>{areaContinents[2].name}</Checkbox>
                    <Checkbox>{areaContinents[3].name}</Checkbox>
                    <Checkbox>{areaContinents[4].name}</Checkbox>
                    <Checkbox>{areaContinents[5].name}</Checkbox>
                    <Checkbox>{areaContinents[6].name}</Checkbox>
                    <Checkbox>{areaContinents[7].name}</Checkbox>
                    <Checkbox>{areaContinents[8].name}</Checkbox>
                    <Checkbox>{areaContinents[9].name}</Checkbox>
                </Panel>
            </Collapse>
        </div>
    )
}

export default AreaBox
