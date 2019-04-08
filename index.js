import React from 'react'
import { Injector } from '@nrg/core'

const InjectorContext = React.createContext()

let injector = null

export const createInjector = (services) => {
  return new Injector().loadServices(services)
}

export const ServiceLocator = class extends React.Component {

  constructor (props) {
    super(props)
    injector = props.injector
  }

  render () {
    return (
      <InjectorContext.Provider value={injector}>
        {this.props.children}
      </InjectorContext.Provider>
    )
  }
}

export const inject = (WrappedComponent, dependencies = {}) => {

  return class extends React.Component {

    static contextType = InjectorContext

    constructor (props) {
      super(props)

      this.services = injector.resolve(dependencies)
    }

    render () {
      return <WrappedComponent {...this.services} {...this.props} />
    }
  }
}