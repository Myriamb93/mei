package com.dima.jelearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Tresult.
 */
@Entity
@Table(name = "tresult")
public class Tresult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @Column(name = "nbre")
    private Integer nbre;

    @Column(name = "result")
    private Float result;

    @ManyToOne
    private User resultUser;

    @ManyToOne
    private Tquiz resultQuiz;

    @OneToMany(mappedBy = "reponseResult")
    @JsonIgnore
    private Set<Treponse> resultReponses = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Tresult date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Integer getNbre() {
        return nbre;
    }

    public Tresult nbre(Integer nbre) {
        this.nbre = nbre;
        return this;
    }

    public void setNbre(Integer nbre) {
        this.nbre = nbre;
    }

    public Float getResult() {
        return result;
    }

    public Tresult result(Float result) {
        this.result = result;
        return this;
    }

    public void setResult(Float result) {
        this.result = result;
    }

    public User getResultUser() {
        return resultUser;
    }

    public Tresult resultUser(User user) {
        this.resultUser = user;
        return this;
    }

    public void setResultUser(User user) {
        this.resultUser = user;
    }

    public Tquiz getResultQuiz() {
        return resultQuiz;
    }

    public Tresult resultQuiz(Tquiz tquiz) {
        this.resultQuiz = tquiz;
        return this;
    }

    public void setResultQuiz(Tquiz tquiz) {
        this.resultQuiz = tquiz;
    }

    public Set<Treponse> getResultReponses() {
        return resultReponses;
    }

    public Tresult resultReponses(Set<Treponse> treponses) {
        this.resultReponses = treponses;
        return this;
    }

    public Tresult addResultReponse(Treponse treponse) {
        this.resultReponses.add(treponse);
        treponse.setReponseResult(this);
        return this;
    }

    public Tresult removeResultReponse(Treponse treponse) {
        this.resultReponses.remove(treponse);
        treponse.setReponseResult(null);
        return this;
    }

    public void setResultReponses(Set<Treponse> treponses) {
        this.resultReponses = treponses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Tresult tresult = (Tresult) o;
        if (tresult.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tresult.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tresult{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", nbre='" + getNbre() + "'" +
            ", result='" + getResult() + "'" +
            "}";
    }
}
