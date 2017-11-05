package com.dima.jelearning.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Quiz.
 */
@Entity
@Table(name = "quiz")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Quiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private ZonedDateTime date;

    @Column(name = "result")
    private Float result;

    @ManyToOne
    private Chapitre chapitre;

    @ManyToOne
    private User quizUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Quiz date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Float getResult() {
        return result;
    }

    public Quiz result(Float result) {
        this.result = result;
        return this;
    }

    public void setResult(Float result) {
        this.result = result;
    }

    public Chapitre getChapitre() {
        return chapitre;
    }

    public Quiz chapitre(Chapitre chapitre) {
        this.chapitre = chapitre;
        return this;
    }

    public void setChapitre(Chapitre chapitre) {
        this.chapitre = chapitre;
    }

    public User getQuizUser() {
        return quizUser;
    }

    public Quiz quizUser(User user) {
        this.quizUser = user;
        return this;
    }

    public void setQuizUser(User user) {
        this.quizUser = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Quiz quiz = (Quiz) o;
        if (quiz.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, quiz.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Quiz{" +
            "id=" + id +
            ", date='" + date + "'" +
            ", result='" + result + "'" +
            '}';
    }
}
