package com.dima.jelearning.service.mapper;

import com.dima.jelearning.domain.*;
import com.dima.jelearning.service.dto.TquestionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Tquestion and its DTO TquestionDTO.
 */
@Mapper(componentModel = "spring", uses = {TquizMapper.class, })
public interface TquestionMapper extends EntityMapper <TquestionDTO, Tquestion> {

    @Mapping(source = "questionQuiz.id", target = "questionQuizId")
    TquestionDTO toDto(Tquestion tquestion);

    @Mapping(source = "questionQuizId", target = "questionQuiz")
    @Mapping(target = "qestionReponses", ignore = true)
    Tquestion toEntity(TquestionDTO tquestionDTO);
    default Tquestion fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tquestion tquestion = new Tquestion();
        tquestion.setId(id);
        return tquestion;
    }
}
