import * as actionType from './actionType'
import * as d3 from 'd3'
import data from '../containers/Site/data.csv'

export const setKineret = (label, level, bgc) => {
  return {
    type: actionType.SET_KINERET,
    label: label,
    level: level,
    backgroundColor: bgc
  }
}

export const setPie = (pieLabel, pieLevel) => {
  return {
    type: actionType.SET_PIE,
    labelPie: pieLabel,
    levelPie: pieLevel
    // backgroundColor: bgc
  }
}

export const initKineret = () => {
  return dispatch => {
    const row = d => {
      let stringLevel = d.Kinneret_Level.toString()
      d.Kinneret_Level = stringLevel
      return d
    }

    d3.csv(data, row).then(res => {
      const getRandomColor = () => {
        let letters = '0123456789ABCDEF'
        let color = ''
        for (var i = 0; i < 1; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
        return color
      }
      let label = []
      let level = []
      let bgc = []
      for (let index = 0; index < res.length; index++) {
        const el = res[index]
        let check = res[index].Survey_Date.split('/')
        check = check.slice(2).toString()
        if (
          el.Survey_Date === '01/1/' + check ||
          el.Survey_Date === '01/4/' + check ||
          el.Survey_Date === '01/7/' + check ||
          el.Survey_Date === '01/12/' + check
        ) {
          label = label.concat(el.Survey_Date.toString().replace('01/', ''))
          bgc = bgc.concat('#624e1' + getRandomColor().toString())
          level = level.concat(el.Kinneret_Level)
          dispatch(setKineret(label, level, bgc))
        }
      }
      return true
    }, [])
  }
}
export const pieSelector = (defaultLevel, defaultLabel) => {
  let updatedArr = []
  let levelArr = []
  levelArr = defaultLabel.map(lvl => {
    let level = lvl.split('.')
    level = level.splice(0, 1).toString()
    return level
  })
  updatedArr = defaultLevel.map(el => {
    let ele = el.split('/')
    ele = ele.splice(1).toString()
    return ele
  })
  levelArr = levelArr.filter(function (item, index, inputArray) {
    return inputArray.indexOf(item) === index
  })
  updatedArr = updatedArr.filter(function (item, index, inputArray) {
    return inputArray.indexOf(item) === index
  })
  return setPie(updatedArr, levelArr)
}