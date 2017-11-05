package com.dima.jelearning.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Examen.
 */
@Entity
@Table(name = "examen")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Examen implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private ZonedDateTime date;

    @Column(name = "result")
    private Float result;

    @ManyToOne
    private User examenUser;

    @ManyToOne
    private Cours examenCours;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Examen date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Float getResult() {
        return result;
    }

    public Examen result(Float result) {
        this.result = result;
        return this;
    }

    public void setResult(Float result) {
        this.result = result;
    }

    public User getExamenUser() {
        return examenUser;
    }

    public Examen examenUser(User user) {
        this.examenUser = user;
        return this;
    }

    public void setExamenUser(User user) {
        this.examenUser = user;
    }

    public Cours getExamenCours() {
        return examenCours;
    }

    public Examen examenCours(Cours cours) {
        this.examenCours = cours;
        return this;
    }

    public void setExamenCours(Cours cours) {
        this.examenCours = cours;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Examen examen = (Examen) o;
        if (examen.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, examen.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Examen{" +
            "id=" + id +
            ", date='" + date + "'" +
            ", result='" + result + "'" +
            '}';
    }
}
