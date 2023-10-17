import { Canister, query, text, update, Void, bool, ic, inspectMessage} from 'azle';

let message = '';

export default Canister({
    
    getMessage: query([], text, () => {
        return message;
    }),
    
    setMessage: update([text], Void, (newMessage) => {
        message = newMessage; 
    }),

    getString: query([], text, () => {
        return 'This is a query method!';
    }),

    inspectMessage: inspectMessage(() => {
        console.log('inspectMessage called');

        if (ic.methodName() === 'accessible') {
            ic.acceptMessage();
            return;
        }

        if (ic.methodName() === 'inaccessible') {
            return;
        }

        throw `Method "${ic.methodName()}" not allowed`;
    }),
    accessible: update([], bool, () => {
        return true;
    }),
    inaccessible: update([], bool, () => {
        return false;
    }),
    alsoInaccessible: update([], bool, () => {
        return false;
    })
    
});

