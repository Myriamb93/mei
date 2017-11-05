package com.dima.jelearning.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Tquestion entity.
 * only questions
 */
public class TquestDTO implements Serializable {

    private Long id;

    private String quest;

    private String first;

    private String second;

    private String third;

    private String fourth;



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
        return "TquestDTO{" +
            "id=" + getId() +
            ", quest='" + getQuest() + "'" +
            ", first='" + getFirst() + "'" +
            ", second='" + getSecond() + "'" +
            ", third='" + getThird() + "'" +
            ", fourth='" + getFourth() + "'" +
            "}";
    }
}
