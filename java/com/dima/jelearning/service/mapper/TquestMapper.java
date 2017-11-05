package com.dima.jelearning.service.mapper;

import com.dima.jelearning.domain.*;
import com.dima.jelearning.service.dto.TquestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Tquestion and its DTO TquestionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TquestMapper extends EntityMapper <TquestDTO, Tquestion> {


    TquestDTO toDto(Tquestion tquestion);


    default Tquestion fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tquestion tquestion = new Tquestion();
        tquestion.setId(id);
        return tquestion;
    }
}
