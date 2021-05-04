export default {
    SET_COMPETITIONS(state, competitions){
        state.competitions = competitions
    },
    SET_COMPETITION(state, competition){
        state.competitions.push(competition)
    },
    UPDATE_COMPETITION(state, competition){
        const index = state.competitions.findIndex(el => el.id === competition.id)
        state.competitions.splice(index, 1, competition)
    },
    DELETE_COMPETITION(state, competitionId){
        const index = state.competitions.findIndex(el => el.id === competitionId)
        state.competitions.splice(index, 1)
    },
}