import React, { PureComponent } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { DateRangePicker } from '@progress/kendo-react-dateinputs'

import Datas from './dataChart'
import '@progress/kendo-theme-default/dist/all.css'
import './chart.css'
import * as funcType from '../../store/index'
class Chart extends PureComponent {
  state = {
    setChart: Line,
    value: {
      start: new Date(),
      end: new Date()
    },
    loading: false
  }

  componentDidMount () {
    this.props.onInitDataKineret()
    if (this.props.defaultLevel && this.props.defaultLabel) {
      this.setState({ loading: false })
    } else {
      this.setState({ loading: true })
    }
  }
  //Pie  !!--OPTION--!!

  // changeToPai = () => {
  //   if (this.state.setChart === Line || this.state.setChart === Bar) {
  //     this.props.onChoosePie(this.props.defaultLabel, this.props.defaultLevel)
  //     this.setState({
  //       setChart: Pie
  //     })
  //   }
  // }

  //END Pie  !!--OPTION--!!
  changeToLine = () => {
    if (this.state.setChart === Bar /*|| this.state.setChart === Pie*/) {
      this.setState({ setChart: Line })
    }
  }
  changeToBar = () => {
    if (this.state.setChart === Line /*|| this.state.setChart === Pie*/) {
      this.setState({ setChart: Bar })
    }
  }
  showFullYear = e => {
    if (e.target.value.length > 3) {
      this.props.onShowFullYear(e.target.value)
    }
    if (e.target.value.length < 1) {
      return this.props.onInitDataKineret()
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
    let start = [e.target.value]
    let end = [e.target.value]
    start = start[0].start
      .toLocaleDateString('he-IL', {
        day: '2-digit',
        year: 'numeric',
        month: 'numeric'
      })
      .replace('.', '/')
      .replace('.', '/')

    return this.props.onshowBetweenDates(start, end)
  }

  render () {
    //Pie  !!--OPTION--!!

    // let labelChart =
    //   this.state.setChart === Pie
    //     ? this.props.labelPie
    //     : this.props.defaultLabel
    // let levelChart =
    //   this.state.setChart === Pie
    //     ? this.props.levelPie
    //     : this.props.defaultLevel
    // let display = this.state.setChart === Pie ? false : true

    //END Pie  !!--OPTION--!!
    let checkBackground =
      this.state.setChart === Line ? '#824e1e3b' : this.props.bgc
    let loading = (
      <h1 style={{ direction: 'rtl', margin: '25px auto' }}>
        'מוריד נתונים חדשים ...'
      </h1>
    )
    if (this.props.title) {
      loading = (
        <Datas
          shows={true}
          checkbackgrounds={checkBackground}
          labelchart={this.props.defaultLabel}
          levels={this.props.defaultLevel}
          selectchart={this.state.setChart}
          textTitle={this.props.title}
        />
      )
    }

    return (
      <React.StrictMode>
        <div className='flex-row'>
          <div className='align'>
            <div className='wrapper-changing'>
              <div className='changing' onClick={this.changeToBar}>
                Change To Bar
              </div>
              {/* <div className='changing' onClick={this.changeToPai}>
              Change To Pie
            </div> */}
              <div className='changing' onClick={this.changeToLine}>
                Change To Line
              </div>

              <div>
                <input
                  type='text'
                  placeholder='Full Year information(2015, example)'
                  onChange={e => this.showFullYear(e)}
                />
              </div>
              <DateRangePicker
                value={this.state.value}
                format='dd.M.yyyy'
                onChange={this.handleChange}
              />
            </div>
          </div>

          {loading}
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2>Created By Dor Dylan Levy </h2>
          <h3>
            <a href='http://dordl.com'>DORDL.COM</a>
            <div style={{ fontSize: '16px' }}>
              <br />
              <p>Created with React / Redux / Axios</p>
              <p>Rsuite / Chart-Js2</p>
              <p>
                <br />
                API from <a href='https://data.gov.il'>Israel Gov.il</a>
              </p>
            </div>
          </h3>
        </div>
      </React.StrictMode>
    )
  }
}

const mapStateToProps = state => {
  return {
    defaultLabel: state.data.label,
    //Pie  !!--OPTION--!!

    // labelPie: state.labelPie,
    // levelPie: state.levelPie,

    //END Pie  !!--OPTION--!!

    defaultLevel: state.data.level,
    bgc: state.backgroundColor,
    title: state.textTitle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitDataKineret: () => dispatch(funcType.initKineret()),
    // onChoosePie: (level, label) => dispatch(funcType.pieSelector(level, label)),
    onShowFullYear: e => dispatch(funcType.showFullYear(e)),
    onshowBetweenDates: (start, end) =>
      dispatch(funcType.chooseRangeDate(start, end))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
