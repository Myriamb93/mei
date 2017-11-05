package com.dima.jelearning.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Treponse entity.
 */
public class TreponseDTO implements Serializable {

    private Long id;

    private Boolean rfirst;

    private Boolean rsecond;

    private Boolean rthird;

    private Boolean rfourth;

    private Long reponseQuestionId;

    private Long reponseResultId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isRfirst() {
        return rfirst;
    }

    public void setRfirst(Boolean rfirst) {
        this.rfirst = rfirst;
    }

    public Boolean isRsecond() {
        return rsecond;
    }

    public void setRsecond(Boolean rsecond) {
        this.rsecond = rsecond;
    }

    public Boolean isRthird() {
        return rthird;
    }

    public void setRthird(Boolean rthird) {
        this.rthird = rthird;
    }

    public Boolean isRfourth() {
        return rfourth;
    }

    public void setRfourth(Boolean rfourth) {
        this.rfourth = rfourth;
    }

    public Long getReponseQuestionId() {
        return reponseQuestionId;
    }

    public void setReponseQuestionId(Long tquestionId) {
        this.reponseQuestionId = tquestionId;
    }

    public Long getReponseResultId() {
        return reponseResultId;
    }

    public void setReponseResultId(Long tresultId) {
        this.reponseResultId = tresultId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TreponseDTO treponseDTO = (TreponseDTO) o;
        if(treponseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), treponseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TreponseDTO{" +
            "id=" + getId() +
            ", rfirst='" + isRfirst() + "'" +
            ", rsecond='" + isRsecond() + "'" +
            ", rthird='" + isRthird() + "'" +
            ", rfourth='" + isRfourth() + "'" +
            "}";
    }
}
