package com.dima.jelearning.service.mapper;

import com.dima.jelearning.domain.*;
import com.dima.jelearning.service.dto.TquizDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Tquiz and its DTO TquizDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TquizMapper extends EntityMapper <TquizDTO, Tquiz> {

    @Mapping(target = "quizResults", ignore = true)
    @Mapping(target = "questionQuizs", ignore = true)
    Tquiz toEntity(TquizDTO tquizDTO);
    default Tquiz fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tquiz tquiz = new Tquiz();
        tquiz.setId(id);
        return tquiz;
    }
}
