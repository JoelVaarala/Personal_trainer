import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Label, PieChart, Pie } from 'recharts';

export default function Charts() {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(
                data => {

                    let tr = new Array();
                    let set = new Set();
                    let tempcount = {};

                    data.map((pr, index) => {
                        set.add(pr.activity);
                    })

                    set.forEach((a) => {
                        tempcount[a] = 0
                    })

                    data.map((pr, index) => {
                        tempcount[pr.activity] = tempcount[pr.activity] + pr.duration
                    })

                    Object.keys(tempcount).forEach((looper) => {
                        tr.push({ name: looper, uv: tempcount[looper] })
                    })
                    setData(tr)
                })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <div>
                <BarChart width={600}
                    height={400}
                    data={data}
                    margin={{ top: 40, right: 0, bottom: 20, left: 30 }}
                >
                    <YAxis>
                        <Label angle={-90}
                            value='Duration (min)'
                            position='insideLeft'
                            style={{ textAnchor: 'middle' }}
                        />
                    </YAxis>
                    <XAxis dataKey="name" type="category" />
                    <Bar dataKey="uv" fill="lightskyblue" label={{ angle: -20 }} />
                </BarChart>

                <PieChart width={600} height={400}>
                    <Pie data={data}
                        dataKey="uv"
                        cx={250}
                        cy={250}
                        innerRadius={40}
                        outerRadius={90}
                        fill="d#8884d8"
                        label={(entry) => entry.name}
                    />
                </PieChart>
            </div>
            <footer style={{ backgroundColor: 'navy', color: 'white', textAlign: 'left' }}> @Personal trainer</footer>
        </div>
    );

}