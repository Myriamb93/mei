package com.dima.jelearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Chapitre.
 */
@Entity
@Table(name = "chapitre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Chapitre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descrip")
    private String descrip;

    @Column(name = "video")
    private String video;

    @Column(name = "rang")
    private Integer rang;

    @Lob
    @Column(name = "fichier")
    private byte[] fichier;

    @Column(name = "fichier_content_type")
    private String fichierContentType;

    @Column(name = "date")
    private ZonedDateTime date;

    @ManyToOne
    private Cours cours;

    @OneToMany(mappedBy = "chapitre")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Question> chapitreQuestions = new HashSet<>();

    @OneToMany(mappedBy = "chapitre")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Quiz> chapitreQuizs = new HashSet<>();

    @ManyToOne
    private User chapitreUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescrip() {
        return descrip;
    }

    public Chapitre descrip(String descrip) {
        this.descrip = descrip;
        return this;
    }

    public void setDescrip(String descrip) {
        this.descrip = descrip;
    }

    public String getVideo() {
        return video;
    }

    public Chapitre video(String video) {
        this.video = video;
        return this;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public Integer getRang() {
        return rang;
    }

    public Chapitre rang(Integer rang) {
        this.rang = rang;
        return this;
    }

    public void setRang(Integer rang) {
        this.rang = rang;
    }

    public byte[] getFichier() {
        return fichier;
    }

    public Chapitre fichier(byte[] fichier) {
        this.fichier = fichier;
        return this;
    }

    public void setFichier(byte[] fichier) {
        this.fichier = fichier;
    }

    public String getFichierContentType() {
        return fichierContentType;
    }

    public Chapitre fichierContentType(String fichierContentType) {
        this.fichierContentType = fichierContentType;
        return this;
    }

    public void setFichierContentType(String fichierContentType) {
        this.fichierContentType = fichierContentType;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Chapitre date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Cours getCours() {
        return cours;
    }

    public Chapitre cours(Cours cours) {
        this.cours = cours;
        return this;
    }

    public void setCours(Cours cours) {
        this.cours = cours;
    }

    public Set<Question> getChapitreQuestions() {
        return chapitreQuestions;
    }

    public Chapitre chapitreQuestions(Set<Question> questions) {
        this.chapitreQuestions = questions;
        return this;
    }

    public Chapitre addChapitreQuestion(Question question) {
        this.chapitreQuestions.add(question);
        question.setChapitre(this);
        return this;
    }

    public Chapitre removeChapitreQuestion(Question question) {
        this.chapitreQuestions.remove(question);
        question.setChapitre(null);
        return this;
    }

    public void setChapitreQuestions(Set<Question> questions) {
        this.chapitreQuestions = questions;
    }

    public Set<Quiz> getChapitreQuizs() {
        return chapitreQuizs;
    }

    public Chapitre chapitreQuizs(Set<Quiz> quizzes) {
        this.chapitreQuizs = quizzes;
        return this;
    }

    public Chapitre addChapitreQuiz(Quiz quiz) {
        this.chapitreQuizs.add(quiz);
        quiz.setChapitre(this);
        return this;
    }

    public Chapitre removeChapitreQuiz(Quiz quiz) {
        this.chapitreQuizs.remove(quiz);
        quiz.setChapitre(null);
        return this;
    }

    public void setChapitreQuizs(Set<Quiz> quizzes) {
        this.chapitreQuizs = quizzes;
    }

    public User getChapitreUser() {
        return chapitreUser;
    }

    public Chapitre chapitreUser(User user) {
        this.chapitreUser = user;
        return this;
    }

    public void setChapitreUser(User user) {
        this.chapitreUser = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Chapitre chapitre = (Chapitre) o;
        if (chapitre.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, chapitre.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Chapitre{" +
            "id=" + id +
            ", descrip='" + descrip + "'" +
            ", video='" + video + "'" +
            ", rang='" + rang + "'" +
            ", fichier='" + fichier + "'" +
            ", fichierContentType='" + fichierContentType + "'" +
            ", date='" + date + "'" +
            '}';
    }
}
