package com.dima.jelearning.service.dto;


import com.dima.jelearning.domain.enumeration.Level;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Tquestion entity.
 */
public class TquestionDTO implements Serializable {

    private Long id;

    private String quest;

    private String first;

    private String second;

    private String third;

    private String fourth;

    private Boolean vfirst;

    private Boolean vsecond;

    private Boolean vthird;

    private Boolean vfourth;

    private Level level;

    private Boolean protect;

    private Boolean activation;

    private Long questionQuizId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuest() {
        return quest;
    }

    public void setQuest(String quest) {
        this.quest = quest;
    }

    public String getFirst() {
        return first;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getSecond() {
        return second;
    }

    public void setSecond(String second) {
        this.second = second;
    }

    public String getThird() {
        return third;
    }

    public void setThird(String third) {
        this.third = third;
    }

    public String getFourth() {
        return fourth;
    }

    public void setFourth(String fourth) {
        this.fourth = fourth;
    }

    public Boolean isVfirst() {
        return vfirst;
    }

    public void setVfirst(Boolean vfirst) {
        this.vfirst = vfirst;
    }

    public Boolean isVsecond() {
        return vsecond;
    }

    public void setVsecond(Boolean vsecond) {
        this.vsecond = vsecond;
    }

    public Boolean isVthird() {
        return vthird;
    }

    public void setVthird(Boolean vthird) {
        this.vthird = vthird;
    }

    public Boolean isVfourth() {
        return vfourth;
    }

    public void setVfourth(Boolean vfourth) {
        this.vfourth = vfourth;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Boolean isProtect() {
        return protect;
    }

    public void setProtect(Boolean protect) {
        this.protect = protect;
    }

    public Boolean isActivation() {
        return activation;
    }

    public void setActivation(Boolean activation) {
        this.activation = activation;
    }

    public Long getQuestionQuizId() {
        return questionQuizId;
    }

    public void setQuestionQuizId(Long tquizId) {
        this.questionQuizId = tquizId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TquestionDTO tquestionDTO = (TquestionDTO) o;
        if(tquestionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tquestionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TquestionDTO{" +
            "id=" + getId() +
            ", quest='" + getQuest() + "'" +
            ", first='" + getFirst() + "'" +
            ", second='" + getSecond() + "'" +
            ", third='" + getThird() + "'" +
            ", fourth='" + getFourth() + "'" +
            ", vfirst='" + isVfirst() + "'" +
            ", vsecond='" + isVsecond() + "'" +
            ", vthird='" + isVthird() + "'" +
            ", vfourth='" + isVfourth() + "'" +
            ", level='" + getLevel() + "'" +
            ", protect='" + isProtect() + "'" +
            ", activation='" + isActivation() + "'" +
            "}";
    }
}
