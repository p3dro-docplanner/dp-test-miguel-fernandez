import { appointmentSlice, appointmentActions } from '../appointmentSlice'

describe("Appointment Slice", () => {

test('should return the initial state', () => {
  expect(appointmentSlice.reducer(undefined, {})).toEqual(
    {
        appointment: "1991-01-12", changed: false, draft: {start: "", end: ""}, loading: false 
    }
  )
})

test('should handle update appoinment correctly', () => {
    const previousState = {appointment: "1991-01-12", changed: false, draft: "", loading: false }
    expect(appointmentSlice.reducer(previousState, appointmentActions.updateAppointment("1991-01-12 10:00:00"))).toEqual(
      {
        appointment: "1991-01-12 10:00:00", changed: false, draft: { start: '', end:'' }, loading: false 
      }
    )
  })

  test('should handle draft appoinment correctly', () => {
    const previousState = {appointment: "1991-01-12 10:00:00", changed: false, draft: "", loading: false }
    expect(appointmentSlice.reducer(previousState, appointmentActions.updateDraft({start: "1991-01-16 10:00:00", end: "1991-01-16 10:10:00"}))).toEqual(
      {
        appointment: "1991-01-12 10:00:00", changed: true, draft: { start: "1991-01-16 10:00:00", end: "1991-01-16 10:10:00"} , loading: false 
      }
    )
  })

  test('should handle loader appoinment', () => {
    const previousState = {appointment: "1991-01-12 10:00:00", changed: false, draft: "", loading: false }
    expect(appointmentSlice.reducer(previousState, appointmentActions.changeLoading("1991-01-16 10:00:00"))).toEqual(
      {
        appointment: "1991-01-12 10:00:00", changed: false, draft: "", loading: true 
      }
    )
  })
  
});
  