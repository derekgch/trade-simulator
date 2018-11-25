import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'
import { v4 } from 'uuid';



const resultRenderer = ({ title, name }) => <Label content={`${title+":"+name}`} />

resultRenderer.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
}

export default class SearchExampleStandard extends Component {
    state={
        isLoading: false, 
        results: [], 
        value: '' 
    }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    // console.log(result)
    this.setState({ value: result.title })
    this.props.setSymbol(result.title)
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value:value.toUpperCase() })
    //call a props function to save value
    // console.log(value)
    this.props.setSymbol(value);

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)
      const isMatchName = result => re.test(result.name)


      const output = _.filter(this.props.searchData, isMatch).slice(0,7)
      const outputName = _.filter(this.props.searchData, isMatchName).slice(0,5)

      this.setState({
        isLoading: false,
        results: arrayUnique([...output, ...outputName]),
      })
    }, 300)
  }



  render() {
    const { isLoading, value, results } = this.state
    // console.log(this.props.searchData[0])
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            // {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}


function arrayUnique(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
              a.splice(j--, 1);
      }
  }

  return a;
}