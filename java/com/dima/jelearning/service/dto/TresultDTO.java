package com.dima.jelearning.service.dto;


import com.dima.jelearning.domain.User;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the Tresult entity.
 */
public class TresultDTO implements Serializable {

    private Long id;

    private ZonedDateTime date;

    private Integer nbre;

    private Float result;

    private User resultUserId;

    private TquizDTO resultQuizId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Integer getNbre() {
        return nbre;
    }

    public void setNbre(Integer nbre) {
        this.nbre = nbre;
    }

    public Float getResult() {
        return result;
    }

    public void setResult(Float result) {
        this.result = result;
    }

    public User getResultUserId() {
        return resultUserId;
    }

    public void setResultUserId(User user) {
        this.resultUserId = user;
    }

    public TquizDTO getResultQuizId() {
        return resultQuizId;
    }

    public void setResultQuizId(TquizDTO tquizDTO) {
        this.resultQuizId = tquizDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TresultDTO tresultDTO = (TresultDTO) o;
        if(tresultDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tresultDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TresultDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", nbre='" + getNbre() + "'" +
            ", result='" + getResult() + "'" +
            "}";
    }
}
