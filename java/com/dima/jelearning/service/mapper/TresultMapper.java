package com.dima.jelearning.service.mapper;

import com.dima.jelearning.domain.*;
import com.dima.jelearning.service.dto.TresultDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Tresult and its DTO TresultDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TquizMapper.class, })
public interface TresultMapper extends EntityMapper <TresultDTO, Tresult> {

    @Mapping(source = "resultUser", target = "resultUserId")

    @Mapping(source = "resultQuiz", target = "resultQuizId")
    TresultDTO toDto(Tresult tresult);

    @Mapping(source = "resultUserId", target = "resultUser")

    @Mapping(source = "resultQuizId", target = "resultQuiz")
    @Mapping(target = "resultReponses", ignore = true)
    Tresult toEntity(TresultDTO tresultDTO);
    default Tresult fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tresult tresult = new Tresult();
        tresult.setId(id);
        return tresult;
    }
}
