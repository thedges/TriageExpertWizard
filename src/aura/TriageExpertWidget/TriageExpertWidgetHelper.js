({
  getContactData: function (component, recId) {
    // save the case
    var action = component.get ('c.queryContactData');
    action.setParams ({
      accountId: recId,
    });

    action.setCallback (this, function (actionResult) {
      var state = actionResult.getState ();
      if (state === 'SUCCESS') {
        var resp = actionResult.getReturnValue ();
        console.log ('resp=' + resp);

        const con = JSON.parse (resp);

        component.set ('v.gender', con.HealthCloudGA__Gender__c);
        component.set ('v.dob', con.Birthdate);
      } else {
        self.handleErrors (component, actionResult.getError ());
      }
    });
    $A.enqueueAction (action);
  },
  createDispositionNote: function (component, recId, title, note) {
    console.log('createDispositionNote...');
    var self = this;
    
    ///////////////////////////////
    // create note in salesforce //
    ///////////////////////////////
    var action = component.get ('c.createNote');
    action.setParams ({
      recId: recId,
      title: title,
      body: note
    });

    self.showSpinner(component);

    action.setCallback (this, function (actionResult) {
      var state = actionResult.getState ();
      if (state === 'SUCCESS') {
        self.hideSpinner(component);

        var resp = actionResult.getReturnValue ();
        console.log ('resp=' + resp);

        //$A.get('e.force:refreshView').fire();

        let toastEvent = $A.get ('e.force:showToast');
        toastEvent.setParams ({
          title: 'Success!',
          message: 'Disposition note created successfully.',
          duration: 2000,
          type: 'success',
        });
        toastEvent.fire ();

        component.set('v.done', false);
          
        $A.get('e.force:refreshView').fire();  
      }
      else {
        self.handleErrors (component, actionResult.getError ());
      }
    });
    $A.enqueueAction (action);
  },
  handleErrors: function (component, errors) {
    var self = this;

    self.hideSpinner(component);

    // Configure error toast
    let toastParams = {
      title: 'Error!',
      message: 'Unknown error', // Default error message
      type: 'error',
      mode: 'sticky',
    };
    // Pass the error message if any
    if (errors && Array.isArray (errors) && errors.length > 0) {
      toastParams.message = errors[0].message;
    } else {
      toastParams.message = errors;
    }
    // Fire error toast
    let toastEvent = $A.get ('e.force:showToast');
    toastEvent.setParams (toastParams);
    toastEvent.fire ();
  },
  showSpinner:function(component){
      component.set("v.IsSpinner",true);
  },
  hideSpinner:function(component){
      component.set("v.IsSpinner",false);
  },
});