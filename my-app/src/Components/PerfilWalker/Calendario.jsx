import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/es';



// export default class DemoApp extends React.Component {
//   render() {
//     return (
//       <FullCalendar
//         plugins={[ dayGridPlugin ]}
//         initialView="dayGridWeek"
//       />
//     )
//   }
// }

// import React from 'react'

function Calendario() {

    const handleDateSelect = (selectInfo) => {
        let calendarApi = selectInfo.view.calendar
        let title = prompt('Please enter a new title for your event')
    
        calendarApi.unselect() // clear date selection
    
        if (title) {
          calendarApi.addEvent({ // will render immediately. will call handleEventAdd
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            // allDay: selectInfo.allDay
          }, true) // temporary=true, will get overwritten when reducer gives new events
        }
      }
    return (
        <div>
            <FullCalendar 
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
              }}
            initialView="dayGridMonth"
            locale = 'es'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateSelect}
            contentHeight= "auto"
            slotDuration = '01:00'
            
            />
        </div>
    )
}

export default Calendario
