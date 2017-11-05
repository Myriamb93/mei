package com.dima.jelearning.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import com.dima.jelearning.domain.enumeration.Bon;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quest")
    private String quest;

    @Column(name = "first")
    private String first;

    @Column(name = "second")
    private String second;

    @Column(name = "third")
    private String third;

    @Column(name = "fourth")
    private String fourth;

    @Enumerated(EnumType.STRING)
    @Column(name = "bon")
    private Bon bon;

    @ManyToOne
    private Chapitre chapitre;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuest() {
        return quest;
    }

    public Question quest(String quest) {
        this.quest = quest;
        return this;
    }

    public void setQuest(String quest) {
        this.quest = quest;
    }

    public String getFirst() {
        return first;
    }

    public Question first(String first) {
        this.first = first;
        return this;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getSecond() {
        return second;
    }

    public Question second(String second) {
        this.second = second;
        return this;
    }

    public void setSecond(String second) {
        this.second = second;
    }

    public String getThird() {
        return third;
    }

    public Question third(String third) {
        this.third = third;
        return this;
    }

    public void setThird(String third) {
        this.third = third;
    }

    public String getFourth() {
        return fourth;
    }

    public Question fourth(String fourth) {
        this.fourth = fourth;
        return this;
    }

    public void setFourth(String fourth) {
        this.fourth = fourth;
    }

    public Bon getBon() {
        return bon;
    }

    public Question bon(Bon bon) {
        this.bon = bon;
        return this;
    }

    public void setBon(Bon bon) {
        this.bon = bon;
    }

    public Chapitre getChapitre() {
        return chapitre;
    }

    public Question chapitre(Chapitre chapitre) {
        this.chapitre = chapitre;
        return this;
    }

    public void setChapitre(Chapitre chapitre) {
        this.chapitre = chapitre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Question question = (Question) o;
        if (question.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, question.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + id +
            ", quest='" + quest + "'" +
            ", first='" + first + "'" +
            ", second='" + second + "'" +
            ", third='" + third + "'" +
            ", fourth='" + fourth + "'" +
            ", bon='" + bon + "'" +
            '}';
    }
}
