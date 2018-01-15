Last login: Sun Jan 14 22:45:02 on ttys001
whh@whh:~$ sshfscredit2
Enter passphrase for key '/Users/whh/.ssh/id_rsa': 
whh@whh:~$ sshcredit2
Enter passphrase for key '/Users/whh/.ssh/id_rsa': 
Welcome to Ubuntu 16.04.3 LTS (GNU/Linux 4.4.0-108-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  Get cloud support with Ubuntu Advantage Cloud Guest:
    http://www.ubuntu.com/business/services/cloud

27 packages can be updated.
0 updates are security updates.


*** System restart required ***
Last login: Fri Jan 12 22:32:55 2018 from 135.23.81.107
forge@dev-mcmaxx-upgrade:~$ cd www.cgdev2.fun/
forge@dev-mcmaxx-upgrade:~/www.cgdev2.fun$ cd resources/assets/jsx/
forge@dev-mcmaxx-upgrade:~/www.cgdev2.fun/resources/assets/jsx$ ll
total 20
drwxrwxr-x 5 forge forge 4096 Dec 15 01:08 ./
drwxrwxr-x 4 forge forge 4096 Dec  7 02:01 ../
drwxrwxr-x 5 forge forge 4096 Jan 12 22:34 admin/
drwxrwxr-x 6 forge forge 4096 Dec  7 02:01 common/
drwxrwxr-x 5 forge forge 4096 Jan  5 15:08 public/
forge@dev-mcmaxx-upgrade:~/www.cgdev2.fun/resources/assets/jsx$ cd common/
forge@dev-mcmaxx-upgrade:~/www.cgdev2.fun/resources/assets/jsx/common$ ll
total 24
drwxrwxr-x 6 forge forge 4096 Dec  7 02:01 ./
drwxrwxr-x 5 forge forge 4096 Dec 15 01:08 ../
drwxrwxr-x 2 forge forge 4096 Dec 12 16:02 environment/
drwxrwxr-x 2 forge forge 4096 Dec  7 02:01 functions/
drwxrwxr-x 2 forge forge 4096 Dec  7 02:01 mixins/
drwxrwxr-x 2 forge forge 4096 Dec 22 05:30 models/
forge@dev-mcmaxx-upgrade:~/www.cgdev2.fun/resources/assets/jsx/common$ cd mixins/
forge@dev-mcmaxx-upgrade:~/www.cgdev2.fun/resources/assets/jsx/common/mixins$ lltotal 20
drwxrwxr-x 2 forge forge 4096 Dec  7 02:01 ./
drwxrwxr-x 6 forge forge 4096 Dec  7 02:01 ../
-rwxrwxr-x 1 forge forge 4890 Jan  2 21:49 FormMixin.jsx*
-rwxrwxr-x 1 forge forge 3062 Dec 20 01:43 MakeChangeEventMixin.jsx*
forge@dev-mcmaxx-upgrade:~/www.cgdev2.fun/resources/assets/jsx/common/mixins$ vi MakeChangeEventMixin.jsx 


import $ from 'jquery'
import _ from 'lodash'

let ChangeEvent = {
  makeChangeEventMixin(emitter) {
    return {
      _isMounted: false,
      componentDidMount: function() {
        this._isMounted = true
        emitter.addListener('change', this.__makeChangeEventMixin_handler_)
        emitter.addListener('unauthorized', this.__makeUnauthorizedEventMixin_handler_)
        emitter.addListener('destroy', this.__destroyEventMixin_handler_)
        emitter.addListener('expiredsession', this.__expiredSessionEventMixin_handler_)
        emitter.addListener('errorurl', this.__errorUrlEventMixin_handler_)
      },
      componentWillUnmount: function() {
        try {
          emitter.removeListener('change', this.__makeChangeEventMixin_handler_)
          emitter.removeListener('unauthorized', this.__makeUnauthorizedEventMixin_handler_)
          emitter.removeListener('destroy', this.__destroyEventMixin_handler_)
          emitter.removeListener('expiredsession', this.__expiredSessionEventMixin_handler_)
          emitter.removeListener('errorurl', this.__errorUrlEventMixin_handler_)
        } catch (e) {}

        this._isMounted = false
      },
      __makeChangeEventMixin_handler_: function(payload) {
        // console.log('Event RECEIVED $this:', this, ' payload: ', payload)
        // this.state is the current state of the component that loaded this mixin
        let currentState = this.state

        // we are passing around a model that we will later set as state for the component
        // first lets populate it
        payload.model.set(payload.value)

        // assign the new state
        currentState[payload.model.modelName] = payload.model

        // set the state, should cause re-render and update the data
        if (this._isMounted) {
          this.setState(currentState)
        }
      },
      __destroyEventMixin_handler_: function(payload) {
        let self = this
        let deferred = new $.Deferred()

        // console.log('__destroyEventMixin_handler_ fired with payload=%O', payload)

        let currentState = this.state

        currentState[payload.model].destroy(deferred)

        deferred.then(function() {
          // assign the new state
          currentState[payload.model.modelName] = _.cloneDeep(payload.baseModel)

          // set the state, should cause re-render and update the data
          self.setState(currentState)
        })
      },
      __makeUnauthorizedEventMixin_handler_: function(payload) {
        // set the state, should cause re-render and update the data
        // if (this.state.SessionModel) {
          this.state.SessionModel.refreshModel()
        // }
      },
      __expiredSessionEventMixin_handler_: function() {
        if (this._isMounted) {
          this.setState({
            expiredSession: true,
          })
        }
      },
      __errorUrlEventMixin_handler_: function() {
        if (this._isMounted) {
          this.setState({
            errorUrl: true,
          })
        }
      },
    }
  },
}

module.exports = ChangeEvent
~                                                                                                                                                                                                                                                                                                                                                             
~                                                                                                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                                 
