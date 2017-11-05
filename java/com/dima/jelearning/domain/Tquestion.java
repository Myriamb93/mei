package com.dima.jelearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.dima.jelearning.domain.enumeration.Level;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Tquestion.
 */
@Entity
@Table(name = "tquestion")
public class Tquestion implements Serializable {

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

    @Column(name = "vfirst")
    private Boolean vfirst;

    @Column(name = "vsecond")
    private Boolean vsecond;

    @Column(name = "vthird")
    private Boolean vthird;

    @Column(name = "vfourth")
    private Boolean vfourth;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_level")
    private Level level;

    @Column(name = "protect")
    private Boolean protect;

    @Column(name = "activation")
    private Boolean activation;

    @ManyToOne
    private Tquiz questionQuiz;

    @OneToMany(mappedBy = "reponseQuestion")
    @JsonIgnore
    private Set<Treponse> qestionReponses = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuest() {
        return quest;
    }

    public Tquestion quest(String quest) {
        this.quest = quest;
        return this;
    }

    public void setQuest(String quest) {
        this.quest = quest;
    }

    public String getFirst() {
        return first;
    }

    public Tquestion first(String first) {
        this.first = first;
        return this;
    }

    public void setFirst(String first) {
        this.first = first;
    }

    public String getSecond() {
        return second;
    }

    public Tquestion second(String second) {
        this.second = second;
        return this;
    }

    public void setSecond(String second) {
        this.second = second;
    }

    public String getThird() {
        return third;
    }

    public Tquestion third(String third) {
        this.third = third;
        return this;
    }

    public void setThird(String third) {
        this.third = third;
    }

    public String getFourth() {
        return fourth;
    }

    public Tquestion fourth(String fourth) {
        this.fourth = fourth;
        return this;
    }

    public void setFourth(String fourth) {
        this.fourth = fourth;
    }

    public Boolean isVfirst() {
        return vfirst;
    }

    public Tquestion vfirst(Boolean vfirst) {
        this.vfirst = vfirst;
        return this;
    }

    public void setVfirst(Boolean vfirst) {
        this.vfirst = vfirst;
    }

    public Boolean isVsecond() {
        return vsecond;
    }

    public Tquestion vsecond(Boolean vsecond) {
        this.vsecond = vsecond;
        return this;
    }

    public void setVsecond(Boolean vsecond) {
        this.vsecond = vsecond;
    }

    public Boolean isVthird() {
        return vthird;
    }

    public Tquestion vthird(Boolean vthird) {
        this.vthird = vthird;
        return this;
    }

    public void setVthird(Boolean vthird) {
        this.vthird = vthird;
    }

    public Boolean isVfourth() {
        return vfourth;
    }

    public Tquestion vfourth(Boolean vfourth) {
        this.vfourth = vfourth;
        return this;
    }

    public void setVfourth(Boolean vfourth) {
        this.vfourth = vfourth;
    }

    public Level getLevel() {
        return level;
    }

    public Tquestion level(Level level) {
        this.level = level;
        return this;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Boolean isProtect() {
        return protect;
    }

    public Tquestion protect(Boolean protect) {
        this.protect = protect;
        return this;
    }

    public void setProtect(Boolean protect) {
        this.protect = protect;
    }

    public Boolean isActivation() {
        return activation;
    }

    public Tquestion activation(Boolean activation) {
        this.activation = activation;
        return this;
    }

    public void setActivation(Boolean activation) {
        this.activation = activation;
    }

    public Tquiz getQuestionQuiz() {
        return questionQuiz;
    }

    public Tquestion questionQuiz(Tquiz tquiz) {
        this.questionQuiz = tquiz;
        return this;
    }

    public void setQuestionQuiz(Tquiz tquiz) {
        this.questionQuiz = tquiz;
    }

    public Set<Treponse> getQestionReponses() {
        return qestionReponses;
    }

    public Tquestion qestionReponses(Set<Treponse> treponses) {
        this.qestionReponses = treponses;
        return this;
    }

    public Tquestion addQestionReponse(Treponse treponse) {
        this.qestionReponses.add(treponse);
        treponse.setReponseQuestion(this);
        return this;
    }

    public Tquestion removeQestionReponse(Treponse treponse) {
        this.qestionReponses.remove(treponse);
        treponse.setReponseQuestion(null);
        return this;
    }

    public void setQestionReponses(Set<Treponse> treponses) {
        this.qestionReponses = treponses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Tquestion tquestion = (Tquestion) o;
        if (tquestion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tquestion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tquestion{" +
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
