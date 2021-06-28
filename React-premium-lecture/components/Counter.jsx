import React from 'react'
import { Col , Card ,Statistic,Icon } from 'antd';

const Counter = ({ counter }) => {
    const counterObjectkey = Object.keys(counter)[0];

    return (
        <Col span={8}>
            <Card>
                <Statistic
                    title={`${Object.keys(counter)} Counter`}
                    value={counter[counterObjectkey].length}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<Icon type="arrow-down" />}
                    suffix="%"
                />
            </Card>
        </Col>
    );
}

export default Counter;