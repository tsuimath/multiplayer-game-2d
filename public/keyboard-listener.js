export default function createKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    // Forma de um observer se registrar dentro de um subject
    function subscribe(observerFunction) {
        // Guarda a função dentro do array observers que está dentro de state
        state.observers.push(observerFunction)
    }

    function notifyAll(command) { 
        // console.log(`keyboardListener -> Notifying ${state.observers.length} observers`) 
    
        // executa todos os observers
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {
        const keyPressed = event.key

        const command  = {
            type: 'move-player', 
            playerId: state.playerId,
            keyPressed
        }

        notifyAll(command)
    }

    return {
        subscribe,
        registerPlayerId
    }
}