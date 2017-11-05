package com.dima.jelearning.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Tquiz.
 */
@Entity
@Table(name = "tquiz")
public class Tquiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descrip")
    private String descrip;

    @Column(name = "nbre")
    private Integer nbre;

    @Lob
    @Column(name = "icone")
    private byte[] icone;

    @Column(name = "icone_content_type")
    private String iconeContentType;

    @OneToMany(mappedBy = "resultQuiz")
    @JsonIgnore
    private Set<Tresult> quizResults = new HashSet<>();

    @OneToMany(mappedBy = "questionQuiz")
    @JsonIgnore
    private Set<Tquestion> questionQuizs = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescrip() {
        return descrip;
    }

    public Tquiz descrip(String descrip) {
        this.descrip = descrip;
        return this;
    }

    public void setDescrip(String descrip) {
        this.descrip = descrip;
    }

    public Integer getNbre() {
        return nbre;
    }

    public Tquiz nbre(Integer nbre) {
        this.nbre = nbre;
        return this;
    }

    public void setNbre(Integer nbre) {
        this.nbre = nbre;
    }

    public byte[] getIcone() {
        return icone;
    }

    public Tquiz icone(byte[] icone) {
        this.icone = icone;
        return this;
    }

    public void setIcone(byte[] icone) {
        this.icone = icone;
    }

    public String getIconeContentType() {
        return iconeContentType;
    }

    public Tquiz iconeContentType(String iconeContentType) {
        this.iconeContentType = iconeContentType;
        return this;
    }

    public void setIconeContentType(String iconeContentType) {
        this.iconeContentType = iconeContentType;
    }

    public Set<Tresult> getQuizResults() {
        return quizResults;
    }

    public Tquiz quizResults(Set<Tresult> tresults) {
        this.quizResults = tresults;
        return this;
    }

    public Tquiz addQuizResult(Tresult tresult) {
        this.quizResults.add(tresult);
        tresult.setResultQuiz(this);
        return this;
    }

    public Tquiz removeQuizResult(Tresult tresult) {
        this.quizResults.remove(tresult);
        tresult.setResultQuiz(null);
        return this;
    }

    public void setQuizResults(Set<Tresult> tresults) {
        this.quizResults = tresults;
    }

    public Set<Tquestion> getQuestionQuizs() {
        return questionQuizs;
    }

    public Tquiz questionQuizs(Set<Tquestion> tquestions) {
        this.questionQuizs = tquestions;
        return this;
    }

    public Tquiz addQuestionQuiz(Tquestion tquestion) {
        this.questionQuizs.add(tquestion);
        tquestion.setQuestionQuiz(this);
        return this;
    }

    public Tquiz removeQuestionQuiz(Tquestion tquestion) {
        this.questionQuizs.remove(tquestion);
        tquestion.setQuestionQuiz(null);
        return this;
    }

    public void setQuestionQuizs(Set<Tquestion> tquestions) {
        this.questionQuizs = tquestions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Tquiz tquiz = (Tquiz) o;
        if (tquiz.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tquiz.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tquiz{" +
            "id=" + getId() +
            ", descrip='" + getDescrip() + "'" +
            ", nbre='" + getNbre() + "'" +
            ", icone='" + getIcone() + "'" +
            ", iconeContentType='" + iconeContentType + "'" +
            "}";
    }
}
