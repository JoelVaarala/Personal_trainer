import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import './main.scss';

export default function Calendary() {

    const [calendarEvents, setCalendarEvents] = React.useState([]);

    React.useEffect(() => {
        getTrainings();
    },[])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => {
                let pracs = data;
                createPracs(pracs)
            })
            .catch(err => console.error(err))
    }

    function createPracs(data) {
        let pracs = Array();
        data.map((tr, index) => {
            let newDate = new Date(tr.date);
            newDate.setMinutes(newDate.getMinutes() + tr.duration)
            if (tr.customer)
                pracs.push({ title: tr.activity + " / " + tr.customer.firstname + " " + tr.customer.lastname, start: tr.date, end: newDate })
        })
        setCalendarEvents(pracs);
    }

    let calendarComponentRef = React.createRef()

    // needed to pass argument -> display data in week / day views
    const handleDateClick = (arg) => {}

    // By default sunday is first day (index 0), so with int value "firstDay" can this be adjusted
    let firstday = 1;

    return (
        <div className='kal'>
        <div className='demo-app'>
            <div className='demo-app-calendar'>
                <FullCalendar 
                    // switching locales is simple locale="fi/en/es"
                    // app build in english, but as practice i made calendary in "fi" since its "en" by default
                    locale="fi"
                    // this is needed to override sunday -> monday as starting day from the left side
                    firstDay={firstday}
                    // options to resize grid to fit the screen: 
                    aspectRatio={3}
                    //height={600}
                    //contentHeight={640}
                    defaultView="dayGridMonth"
                    header={{
                        left: 'prev,today,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    buttonText={{
                        // to change button content
                        today: 'Tämä pvm',
                        month: 'Kuukausi',
                        week: 'Viikko',
                        day: 'Päivä'
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    ref={calendarComponentRef}
                    events={calendarEvents}
                />
            </div>
        </div>
        <footer style={{backgroundColor: 'navy', color: 'white', textAlign: 'left'}}> @Personal trainer</footer>
        </div>
    )
}