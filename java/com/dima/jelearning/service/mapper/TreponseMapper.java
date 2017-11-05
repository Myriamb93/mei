package com.dima.jelearning.service.mapper;

import com.dima.jelearning.domain.*;
import com.dima.jelearning.service.dto.TreponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Treponse and its DTO TreponseDTO.
 */
@Mapper(componentModel = "spring", uses = {TquestionMapper.class, TresultMapper.class, })
public interface TreponseMapper extends EntityMapper <TreponseDTO, Treponse> {

    @Mapping(source = "reponseQuestion.id", target = "reponseQuestionId")

    @Mapping(source = "reponseResult.id", target = "reponseResultId")
    TreponseDTO toDto(Treponse treponse);

    @Mapping(source = "reponseQuestionId", target = "reponseQuestion")

    @Mapping(source = "reponseResultId", target = "reponseResult")
    Treponse toEntity(TreponseDTO treponseDTO);
    default Treponse fromId(Long id) {
        if (id == null) {
            return null;
        }
        Treponse treponse = new Treponse();
        treponse.setId(id);
        return treponse;
    }
}
