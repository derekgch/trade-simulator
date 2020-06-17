import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'



const resultRenderer = ({ title, name }) => <Label content={`${title + ":" + name}`} />

resultRenderer.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
}

export default class SearchExampleStandard extends Component {
  state = {
    isLoading: false,
    results: [],
    value: ''
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title })
    this.props.setSymbol(result.title)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value: value.toUpperCase() })
    this.props.setSymbol(value);

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      const isMatchName = result => re.test(result.name)
      const exactMatch = result => result.title === this.state.value

      const output = _.filter(this.props.searchData, isMatch).slice(0, 8)
      const outputName = _.filter(this.props.searchData, isMatchName).slice(0, 8)
      const excactOutput = _.filter(this.props.searchData, exactMatch)

      const blurOuput = arrayUnique([...output, ...outputName]).slice(0, 8);

      this.setState({
        isLoading: false,
        results: arrayUnique([...excactOutput, ...blurOuput])
      })
    }, 300)
  }



  render() {
    const { isLoading, value, results } = this.state
    return (
      <Search fluid
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        results={results}
        value={value}
        resultRenderer={resultRenderer}
        placeholder="Search Stock Symbol"
        input={{ icon: 'search', iconPosition: 'left' }}
      />
    )
  }
}


function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
}